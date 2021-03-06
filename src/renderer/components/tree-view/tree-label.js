import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';
import LabelEditor from './tree-label-edit';

const Node = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

class TreeLabel extends Component {
  handleSave = title => {
    const { isNew, parentId, id } = this.props.node;
    if (isNew) {
      this.props.onCreateNew(parentId, id, title);
    } else {
      this.props.onSaveClick(id, title);
    }
  };

  handleDismiss = () => {
    this.props.onDismissClick();
  };

  render() {
    const { node, onRightClick, intl } = this.props;
    const { title, isNew, isRenaming } = node;

    if (isNew || isRenaming) {
      return (
        <Node>
          <LabelEditor
            node={node}
            onSave={this.handleSave}
            onDismiss={this.handleDismiss}
          />
        </Node>
      );
    }

    return (
      <Node onContextMenu={onRightClick}>
        {title.trim() || (
          <i>
            {intl.formatMessage({
              id: 'untitled',
              defaultMessage: 'Untitled'
            })}
          </i>
        )}
      </Node>
    );
  }
}

TreeLabel.propTypes = {
  node: PropTypes.object,
  onDismissClick: PropTypes.func,
  onSaveClick: PropTypes.func,
  onCreateNew: PropTypes.func,
  onRightClick: PropTypes.func,
  intl: intlShape.isRequired
};

export default injectIntl(TreeLabel);
