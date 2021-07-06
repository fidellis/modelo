import React, { Component } from 'react';
import PropTypes from 'prop-types';


const Label = ({ children, onSort, column }) => {
  const styles = {
    label: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 13,
      height: '100%',
      padding: 8,
    },
  };

  const { sorted } = column;
  const sortable = column.sortable !== false;
  const sortIcon = onSort && sortable && sorted !== undefined ? sorted ? ' ↑' : ' ↓' : '';
  const onClick = sortable ? onSort : null;

  return (
    <div style={styles.label}>
      <span onClick={onClick} style={{ textAlign: 'center', cursor: sortable ? 'pointer' : null }}>{children}</span> {sortIcon}
    </div>
  )
  ;
};

const Input = ({ column, onSearch }) => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    input: {
      width: '90%',
      marginTop: 2,
      marginBottom: 2,
      border: 1,
      borderColor: 'rgba(0, 0, 0, 0.14)',
      borderStyle: 'solid',
      borderRadius: 4,
      padding: 2,
      color: '#626466',
    },
  };

  return (
    <div style={styles.container}>
      <input
        onChange={e => onSearch({ value: e.target.value, column })}
        value={column.searchValue || ''}
        style={styles.input}
      />
    </div>
  );
};

const Container = ({ children, height, headerStyle }) => {
  const styles = {
    container: {
      color: '#626466',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'stretch',
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      borderWidth: [0, 1, 0, 0],
      borderColor: 'rgba(0,0,0,0.02)',
    },
  };
  return (
    <div style={{ ...styles.container, ...headerStyle, height }}>
      {children}
    </div>
  );
};

const Cell = ({ children, column, height, onSort, onSearch }) => {
  const { search, headerStyle } = column;
  return (
    <Container height={height} headerStyle={headerStyle}>
      <Label column={column} onSort={onSort}>{children}</Label>
      {search && <Input column={column} onSearch={onSearch} />}
    </Container>);
};

const GroupCell = ({ children, column, height }) => {
  let { headerStyle } = column;
  if (children) {
    headerStyle = {
      ...headerStyle,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderRightStyle: 'solid',
      borderLeftStyle: 'solid',
      borderColor: '#d3d3d3',
    };
  }

  return (
    <Container height={height} headerStyle={headerStyle}>
      <Label column={column}>{children}</Label>
    </Container>);
};


class Header extends Component {
  constructor(props) {
    super(props);

    this.onSort = this.onSort.bind(this);
  }

  onSort(e) {
    e.preventDefault();
    if (this.props.onSort) {
      this.props.onSort(this.props.column);
    }
  }

  render() {
    const { children, column, height, onSearch, group } = this.props;

    return (
      group ?
        <GroupCell
          column={column}
          height={height}
        >
          {children}
        </GroupCell>
        :
        <Cell
          column={column}
          height={height}
          onSort={this.onSort}
          onSearch={onSearch}
        >
          {children}
        </Cell>

    );
  }
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  column: PropTypes.object.isRequired,
  height: PropTypes.number,
  onSort: PropTypes.func,
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  column: {},
  height: null,
  onSort: null,
  onSearch: null,
};

export default Header;

