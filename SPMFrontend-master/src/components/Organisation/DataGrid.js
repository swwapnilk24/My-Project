import ReactDataGrid from 'react-data-grid';
import React from 'react';
import { connect } from 'react-redux';
import { setExpandRows } from '../../actions/OrgchartAction';

function getAllChildrens(hierarchy, id, data) {
  const childrens = [];
  hierarchy[id].children.map((child, index) => {
    const childObj = data[child];
    if (hierarchy[child].children.length > 0) {
      const childs = getAllChildrens(hierarchy, child, data);
      childObj.children = childs;
    }
    childrens.push(childObj);
    return index;
  });
  return childrens;
}
function createRows(data, hierarchy) {
  const rows = [];
  const tempObj = {};
  data.map((dataRow, index) => {
    tempObj[dataRow.employeeid] = dataRow;
    return index;
  });

  Object.keys(hierarchy).map((parent, index) => {
    if (tempObj[parent].parent === undefined || tempObj[parent].parent === null) {
      const mainRow = tempObj[parent];
      mainRow.children = getAllChildrens(hierarchy, parent, tempObj);
      rows.push(mainRow);
    }
    return index;
  });
  return rows;
}

class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    const rows = createRows(props.data, props.hierarchy);
    this.state = { expanded: props.expanded, rows, enableCellSelect: false, current_view: props.current_view };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.expanded);
  }
  componentWillUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const rows = createRows(this.props.data, this.props.hierarchy);
      this.setState({ rows });
    }
  }
  onCellExpand = (args) => {
    console.log(args);
    const rows = this.state.rows.slice(0);
    const rowKey = args.rowData.key;
    const rowIndex = rows.indexOf(args.rowData);
    const subRows = args.expandArgs.children;
    const expanded = Object.assign({}, this.state.expanded);
    if (expanded && !expanded[rowKey]) {
      expanded[rowKey] = true;
      this.updateSubRowDetails(subRows, args.rowData.treeDepth);
      rows.splice(rowIndex + 1, 0, ...subRows);
    } else if (expanded[rowKey]) {
      expanded[rowKey] = false;
      rows.splice(rowIndex + 1, subRows.length);
    }
    this.setState({ expanded, rows });
    this.props.dispatch(setExpandRows(expanded, this.props.current_view));
  };
  getSubRowDetails = (rowItem) => {
    const isExpanded = this.state.expanded[rowItem.key] ? this.state.expanded[rowItem.key] : false;
    return {
      group: rowItem.children && rowItem.children.length > 0,
      expanded: isExpanded,
      children: rowItem.children,
      field: 'name',
      treeDepth: rowItem.treeDepth || 0,
      siblingIndex: rowItem.siblingIndex,
      numberSiblings: rowItem.numberSiblings
    };
  };

  getRows = (i) => this.state.rows[i];

  updateSubRowDetails = (subRows, parentTreeDepth) => {
    const treeDepth = parentTreeDepth || 0;
    subRows.forEach((sr, i) => {
      sr.treeDepth = treeDepth + 1; // eslint-disable-line no-param-reassign
      sr.siblingIndex = i; // eslint-disable-line no-param-reassign
      sr.numberSiblings = subRows.length; // eslint-disable-line no-param-reassign
    });
  };

  render() {
    return (
      <ReactDataGrid
        enableCellSelect={this.state.enableCellSelect}
        columns={this.props.columns}
        rowGetter={this.getRows}
        rowsCount={this.state.rows.length}
        getSubRowDetails={this.getSubRowDetails}
        minHeight={300}
        onCellExpand={this.onCellExpand}
      />
    );
  }
}

export default connect()(DataGrid);
