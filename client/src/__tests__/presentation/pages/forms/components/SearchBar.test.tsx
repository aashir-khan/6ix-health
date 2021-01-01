import React from 'react';
import sinon from 'sinon';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../../../../../presentation/pages/forms/components/SearchBar';

const spies: { [K: string]: sinon.SinonSpy } = {};
describe('FormsPageController', () => {
  beforeAll(() => {
    spies.onQueryComplete = sinon.spy();
  });

  test('should parse query and call callback', () => {
    const { getByRole } = render(
      <SearchBar onQueryComplete={spies.onQueryComplete} />
    );
    const searchbox = getByRole('searchbox');
    fireEvent.change(searchbox, {
      target: {
        value:
          'this form-id:abc1 dp-id:xyz1 is a query dp-id:xyz2 form-id:abc2',
      },
    });

    expect(
      spies.onQueryComplete.calledWith({
        SDCFormIds: ['abc1', 'abc2'],
        queryText: 'this is a query',
        diagnosticProcedureIds: ['xyz1', 'xyz2'],
      })
    );
  });
});
