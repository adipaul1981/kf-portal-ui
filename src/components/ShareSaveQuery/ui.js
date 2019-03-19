import styled from 'react-emotion';
import { LightButton } from 'uikit/Button';
import { FileRepoH3 } from '../../uikit/Headings';

export const CustomLightButton = styled(LightButton)`
  min-width: 75px;
  font-size: 10px;
`;

export const SaveQueryHeading = styled(FileRepoH3)`
  border-bottom: 1px solid ${({ theme }) => theme.greyScale4};
  padding: 7px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
