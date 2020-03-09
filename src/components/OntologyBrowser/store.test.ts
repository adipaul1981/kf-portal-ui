import React from 'react';
// import { render } from '@testing-library/react';
import { PhenotypeStore, TreeNode } from './store';
import { flatMockData } from './mockData';

describe('Phenotype Store', () => {
  let newStore: PhenotypeStore;

  beforeAll(() => {
    newStore = new PhenotypeStore();
    newStore.getPhenotypes = jest.fn().mockReturnValue(Promise.resolve(flatMockData));
  });

  it('should create first level', () =>
    newStore.fetch().then(data => {
      let firstLevel = newStore.tree[0];
      expect(newStore.tree.length).toBeGreaterThan(0);
      expect(firstLevel.key).toEqual('All (HP:0000001)');
      expect(firstLevel.title).toEqual('All (HP:0000001)');
      expect(firstLevel.children.length).toEqual(1);
      expect(firstLevel.results).toEqual(492);
    }));

  it('should create sublevels', () =>
    newStore.fetch().then(data => {
      let firstLevel = newStore.tree[0];
      let firstChild = firstLevel.children[0];
      expect(firstChild.key).toEqual('All (HP:0000001)-Phenotypic abnormality (HP:0000118)');
      expect(firstChild.children.length).toEqual(2);
      expect(firstChild.children[0].title).toEqual(
        'Abnormality of the nervous system (HP:0000707)',
      );
      expect(firstChild.children[0].key).toEqual(
        'All (HP:0000001)-Phenotypic abnormality (HP:0000118)-Abnormality of the nervous system (HP:0000707)',
      );
    }));

  it('should add the same phenotypes on different parent and sublevels', () =>
    newStore.fetch().then(data => {
      let firstLevel = newStore.tree[0]; // All (HP:0000001)
      let firstChild = firstLevel.children[0]; // Phenotypic abnormality (HP:0000118)
      let secondChild = firstChild.children[0];
      let thirdChild = secondChild.children[1];
      let commonAncestor = thirdChild.children[0];

      expect(firstLevel.key).toEqual('All (HP:0000001)');
      expect(firstChild.title).toEqual('Phenotypic abnormality (HP:0000118)');
      expect(secondChild.title).toEqual('Abnormality of the nervous system (HP:0000707)');
      expect(thirdChild.title).toEqual('Abnormality of nervous system morphology (HP:0012639)');
      expect(commonAncestor.title).toEqual(
        'Morphological abnormality of the central nervous system (HP:0002011)',
      );

      // check first insertion
      let firstOccurenceParent = commonAncestor.children[0].children[0]; // Abnormality of the eye (HP:0000478)
      let firstOccurence = firstOccurenceParent.children[0]; // Abnormal eye physiology (HP:0012373)

      expect(firstOccurenceParent.title).toEqual(
        'Abnormality of the cerebral ventricles (HP:0002118)',
      );
      expect(firstOccurence.title).toEqual('Hydrocephalus (HP:0000238)');

      // check second insertion
      let secondOccurenceParent = commonAncestor.children[1]; // Abnormality of the eye (HP:0000478)
      let secondOccurence = secondOccurenceParent.children[0]; // Abnormal eye physiology (HP:0012373)

      expect(secondOccurenceParent.title).toEqual(
        'Abnormality of the cerebrospinal fluid (HP:0002921)',
      );
      expect(secondOccurence.title).toEqual('Hydrocephalus (HP:0000238)');
    }));

  it('should add the phenotype to a parent that was enter later in the tree', () =>
    newStore.fetch().then(data => {
      let firstLevel = newStore.tree[0]; // All (HP:0000001)
      let firstChild = firstLevel.children[0]; // Phenotypic abnormality (HP:0000118)
      let secondChild = firstChild.children[1]; // Abnormality of the eye (HP:0000478)
      let thirdChild = secondChild.children[0]; // Abnormal eye physiology (HP:0012373)

      expect(firstLevel.key).toEqual('All (HP:0000001)');
      expect(firstChild.title).toEqual('Phenotypic abnormality (HP:0000118)');
      expect(secondChild.title).toEqual('Abnormality of the eye (HP:0000478)');
      expect(thirdChild.title).toEqual('Abnormal eye physiology (HP:0012373)');
    }));

  it('should have as much element as item multiply by parents', () =>
    newStore.fetch().then(data => {
      // Count how many possible occurence
      const sumOfTotalInsert = newStore.phenotypes
        .map(p => (p.top_hits.parents.length > 1 ? p.top_hits.parents.length : 1))
        .reduceRight((p, c, i, s) => p + c);
      expect(sumOfTotalInsert).toEqual(22);

      // Validate that all occurence has been added to the tree
      let insertedElements = 0;
      const computeOccurentInTree = (node: TreeNode[]) => {
        node.forEach(p => {
          insertedElements++;
          if (p.children.length > 0) {
            computeOccurentInTree(p.children);
          }
        });
      };
      computeOccurentInTree(newStore.tree);
      expect(insertedElements).toEqual(22);
    }));
});
