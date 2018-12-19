import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ListItemIcon = styled.div`
  label: list-item-icon;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

ListItemIcon.propTypes = {
  /**
   * The content of the component
   */
  children: PropTypes.element.isRequired
};

export default ListItemIcon;
