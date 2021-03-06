import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import union from 'lodash/union';
import compact from 'lodash/compact';
import { compose, withState } from 'recompose';
import { message } from 'antd';
import autobind from 'auto-bind-es5';

import ControlledDataTable from 'uikit/DataTable/ControlledDataTable';
import { Link } from 'uikit/Core';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSelectionCount,
  ToolbarDownload,
} from 'uikit/DataTable/TableToolbar/styles';
import ColumnFilter from 'uikit/DataTable/ToolbarButtons/ColumnFilter';
import Export from 'uikit/DataTable/ToolbarButtons/Export';
import { configureCols } from 'uikit/DataTable/utils/columns';
import { trackUserInteraction } from 'services/analyticsTracking';
import DownloadButton from 'components/FileRepo/DownloadButton';
import { arrangerProjectId } from 'common/injectGlobals';
import { SORTABLE_FIELDS_MAPPING } from './queries';
import FileIcon from 'icons/FileIcon';
import { MONDOLink } from '../../Utils/DiagnosisAndPhenotypeLinks';

import './ParticipantTableView.css';

const SelectionCell = ({ value: checked, onCellSelected, row }) => {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={
        row
          ? () => onCellSelected(!checked, row)
          : evt => {
              onCellSelected(evt.currentTarget.checked);
            }
      }
    />
  );
};

const isMondo = datum => typeof datum === 'string' && datum.includes('MONDO');

const enhance = compose(withState('collapsed', 'setCollapsed', true));

const CollapsibleMultiLineCell = enhance(({ value: data, collapsed, setCollapsed }) => {
  // Display one row when there is exactly more than one row.
  // Collapsing a single don't save any space.
  const cleanedUniquifiedData = compact(union(data));

  const sizeOfCleanData = cleanedUniquifiedData.length;

  const displayedRowCount = collapsed ? 1 : sizeOfCleanData;
  const displayMoreButton = sizeOfCleanData > 1;
  const hasManyValues = sizeOfCleanData > 1;

  return (
    <div className="rowCss">
      <div style={{ display: 'flex', flexDirection: 'column', flex: '4' }}>
        {cleanedUniquifiedData.slice(0, displayedRowCount).map((datum, index) => {
          if (isMondo(datum)) {
            return <MONDOLink key={index} mondo={datum} />;
          } else {
            return (
              <div key={index}>
                {hasManyValues && '\u2022'}
                {datum === null
                  ? '\u00A0' /* unbreakable space to avoid empty rows from collapsing in height */
                  : datum}
              </div>
            );
          }
        })}
      </div>
      {displayMoreButton && (
        <div
          style={{ flex: '1', marginTop: '-8px ' }}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <div className={`showMore-wrapper ${collapsed ? 'more' : 'less'}`}>
            {collapsed ? `${sizeOfCleanData - displayedRowCount} ` : ''}
          </div>
        </div>
      )}
    </div>
  );
});

const NbFilesCell = compose(({ value: nbFiles, row }) => {
  const encodedSqon = encodeURI(
    JSON.stringify(
      {
        op: 'and',
        content: [
          {
            op: 'in',
            content: {
              field: 'participants.kf_id',
              value: [row.participantId],
            },
          },
        ],
      },
      null,
      0,
    ),
  );

  return (
    <Link to={`/search/file?sqon=${encodedSqon}`} className="nbFilesLink">
      <FileIcon style={{ marginRight: '5px' }} width="8px" height="13px" fill="#a9adc0" />
      {`${nbFiles} Files`}
    </Link>
  );
});

const ParticipantIdLink = compose(({ value: idParticipant }) => {
  return <Link to={`/participant/${idParticipant}#summary`}>{`${idParticipant}`}</Link>;
});

const participantsTableViewColumns = (onRowSelected, onAllRowsSelected, dirtyHack) => [
  {
    Header: props => {
      return (
        <SelectionCell
          {...props}
          value={dirtyHack.allRowsSelected}
          onCellSelected={onAllRowsSelected}
        />
      );
    },
    Cell: props => {
      return <SelectionCell value={props.value} row={props.row} onCellSelected={onRowSelected} />;
    },
    accessor: 'selected',
    filterable: false,
    sortable: false,
    skipExport: true,
    resizable: false,
    minWidth: 33,
  },
  {
    Header: 'Participant ID',
    accessor: 'participantId',
    Cell: props => <ParticipantIdLink value={props.value} />,
  },
  {
    Header: 'Study Name',
    accessor: 'studyName',
    minWidth: 140,
  },
  { Header: 'Proband', accessor: 'isProband', minWidth: 65 },
  { Header: 'Vital Status', accessor: 'vitalStatus', minWidth: 70 },
  {
    Header: 'Diagnosis Category',
    accessor: 'diagnosisCategories',
    Cell: props => (
      <CollapsibleMultiLineCell
        value={props.value}
        collapsed={props.collapsed}
        setCollapsed={props.setCollapsed}
      />
    ),
    field: 'diagnoses.diagnosis_category',
    sortable: false,
  },
  {
    Header: 'Diagnosis (Mondo)',
    accessor: 'diagnosisMondo',
    Cell: props => (
      <CollapsibleMultiLineCell
        value={props.value}
        collapsed={props.collapsed}
        setCollapsed={props.setCollapsed}
      />
    ),
    field: 'diagnoses.mondo_id_diagnosis',
    minWidth: 175,
    sortable: false,
  },
  {
    Header: 'Age at Diagnosis (days)',
    accessor: 'ageAtDiagnosis',
    Cell: props => (
      <CollapsibleMultiLineCell
        value={props.value}
        collapsed={props.collapsed}
        setCollapsed={props.setCollapsed}
      />
    ),
    field: 'diagnoses.age_at_event_days',
    sortable: false,
  },
  { Header: 'Gender', accessor: 'gender', field: 'gender', minWidth: 70 },
  { Header: 'Family ID', accessor: 'familyId', field: 'family_id' },
  {
    Header: 'Family Composition',
    accessor: 'familyCompositions',
    Cell: props => (
      <CollapsibleMultiLineCell
        value={props.value}
        collapsed={props.collapsed}
        setCollapsed={props.setCollapsed}
      />
    ),
    field: 'family.family_compositions',
    sortable: false,
  },
  {
    Header: 'Files',
    accessor: 'filesCount',
    Cell: props => <NbFilesCell value={props.value} row={props.row} />,
    field: 'files',
    sortable: false,
  },
];

class ParticipantsTable extends Component {
  static defaultProps = {
    sqon: {
      op: 'and',
      content: [],
    },
  };

  constructor(props) {
    super(props);
    // TODO clean that once react-table is updated.
    this.dirtyHack = { allRowsSelected: props.allRowsSelected };
    this.state = {
      columns: configureCols(
        participantsTableViewColumns(props.onRowSelected, props.onAllRowsSelected, this.dirtyHack),
      ).map(field =>
        field.sortable !== false && SORTABLE_FIELDS_MAPPING.has(field.accessor)
          ? { ...field, sortable: true }
          : { ...field, sortable: false },
      ),
    };
    autobind(this);
  }

  handleDownloadStarted(downloadId) {
    // `duration: 0` means "do not hide automatically"
    message.loading({
      content: 'Please wait while we generate your report',
      key: downloadId,
      duration: 0,
    });
  }

  handleDownloadCompleted(err, downloadId) {
    err !== null
      ? message.error({
          content: 'An error prevented the report from being generated, please try again later',
          key: downloadId,
          duration: 3,
        })
      : message.success({
          content: 'Done',
          key: downloadId,
          duration: 3,
        });
  }

  render() {
    const {
      loading,
      data,
      api,
      sort,
      dataTotalCount,
      onFetchData,
      onClearSelected,
      analyticsTracking = null,
      downloadName = 'data',
      selectedRows,
      allRowsSelected,
      sqon,
    } = this.props;
    // I know. Sometimes, you gotta do what you gotta do.
    this.dirtyHack.allRowsSelected = allRowsSelected;
    const { columns } = this.state;
    const selectedRowsCount = allRowsSelected ? dataTotalCount : selectedRows.length;
    const projectId = arrangerProjectId;

    return (
      <Fragment>
        <Toolbar style={{ border: 'none' }}>
          <Fragment>
            <ToolbarGroup style={{ border: 'none' }}>
              <Fragment>
                {/*
                <RemoveFromCohortButton
                  onClick={() => handleRemoveFromCohort()}
                  disabled={allRowsSelected || selectedRows.length === 0}
                />*/}
                {selectedRowsCount > 0 ? (
                  <ToolbarSelectionCount>
                    <Fragment>
                      <span>{selectedRowsCount}</span>
                      <span>{`\u00A0participant${
                        selectedRowsCount > 1 ? 's are' : ' is'
                      } selected\u00A0`}</span>
                      <button onClick={evt => onClearSelected()} className="clearSelection">
                        {'clear selection'}
                      </button>
                    </Fragment>
                  </ToolbarSelectionCount>
                ) : null}
              </Fragment>
            </ToolbarGroup>
            <ToolbarDownload>
              <DownloadButton
                sqon={sqon}
                {...this.props}
                projectId={projectId}
                onDownloadStarts={this.handleDownloadStarted}
                onDownloadEnds={this.handleDownloadCompleted}
              />
            </ToolbarDownload>
            <ToolbarGroup>
              <ColumnFilter
                columns={columns}
                onChange={item => {
                  const index = columns.findIndex(c => c.index === item.index);
                  const cols = columns.map((col, i) =>
                    i === index ? { ...col, ...{ show: !item.show } } : col,
                  );
                  const colActedUpon = cols[index];
                  if (analyticsTracking) {
                    trackUserInteraction({
                      category: analyticsTracking.category,
                      action: `Datatable: ${analyticsTracking.title}: Column Filter: ${
                        colActedUpon.show ? 'show' : 'hide'
                      }`,
                      label: colActedUpon.Header,
                    });
                  }
                  this.setState({ columns: cols });
                }}
              />
              <Export
                {...{
                  columns,
                  selectedRows: selectedRows || [],
                  downloadName,
                  api,
                  sqon: sqon,
                  sort,
                  dataTotalCount,
                  data: [],
                }}
              >
                export
              </Export>
            </ToolbarGroup>
          </Fragment>
        </Toolbar>
        <ControlledDataTable
          columns={columns}
          data={data}
          loading={loading}
          className="participantTable"
          onFetchData={onFetchData}
          dataTotalCount={dataTotalCount}
        />
      </Fragment>
    );
  }
}

ParticipantsTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  dataTotalCount: PropTypes.number.isRequired,
  onFetchData: PropTypes.func.isRequired,
  onRowSelected: PropTypes.func.isRequired,
  onAllRowsSelected: PropTypes.func.isRequired,
  onClearSelected: PropTypes.func.isRequired,
  analyticsTracking: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  downloadName: PropTypes.string,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  allRowsSelected: PropTypes.bool.isRequired,
};

export default ParticipantsTable;
