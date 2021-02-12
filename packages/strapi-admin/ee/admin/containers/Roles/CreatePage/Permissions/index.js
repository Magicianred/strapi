import React, { forwardRef, memo, useCallback, useImperativeHandle, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from '../../../../../../admin/src/components/Roles';
import { roleTabsLabel as TAB_LABELS } from '../../../../../../admin/src/utils';
import { PermissionsDataManagerProvider } from '../contexts/PermissionsDataManagerContext';
import ContentTypes from '../ContentTypes';
import layout from '../temp/fakeData';
import reducer, { initialState } from './reducer';

const Permissions = forwardRef(({ layout }, ref) => {
  const [{ modifiedData }, dispatch] = useReducer(reducer, initialState);

  useImperativeHandle(ref, () => {
    return {
      getPermissions: () => {
        console.log('todo');
      },
      resetForm: () => {
        console.log('todo');
      },
    };
  });

  const handleChangeCollectionTypeLeftActionRowCheckbox = (
    pathToCollectionType,
    propertyName,
    rowName,
    value
  ) => {
    dispatch({
      type: 'ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX',
      pathToCollectionType,
      propertyName,
      rowName,
      value,
    });
  };

  const handleChangeSimpleCheckbox = useCallback(({ target: { name, value } }) => {
    dispatch({
      type: 'ON_CHANGE_SIMPLE_CHECKBOX',
      keys: name,
      value,
    });
  }, []);

  const handleChangeParentCheckbox = useCallback(({ target: { name, value } }) => {
    dispatch({
      type: 'ON_CHANGE_TOGGLE_PARENT_CHECKBOX',
      keys: name,
      value,
    });
  }, []);

  return (
    <PermissionsDataManagerProvider
      value={{
        modifiedData,
        onChangeSimpleCheckbox: handleChangeSimpleCheckbox,
        onChangeParentCheckbox: handleChangeParentCheckbox,
        onChangeCollectionTypeLeftActionRowCheckbox: handleChangeCollectionTypeLeftActionRowCheckbox,
      }}
    >
      <Tabs tabsLabel={TAB_LABELS}>
        <ContentTypes layout={layout.sections.collectionTypes} kind="collectionTypes" />
        <ContentTypes layout={layout.sections.singleTypes} kind="singleTypes" />
        <div>Plugins</div>
        <div>Settings</div>
      </Tabs>
    </PermissionsDataManagerProvider>
  );
});

Permissions.defaultProps = {
  layout,
};
Permissions.propTypes = {
  // Todo
  layout: PropTypes.object,
};

export default memo(Permissions);
