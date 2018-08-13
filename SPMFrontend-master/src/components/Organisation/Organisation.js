/**
 * @file Organisation Component.
 * @author Mahesh
 */
import React from 'react';
import go from 'gojs';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import MultiToggle from 'react-multi-toggle';
import { Button } from 'react-bootstrap';
import './Organisation.scss';
import './style.css';
import { loadSimulationVersions, deleteSimulationVersion, getEmployeeRatings, changeHierarchyType, changeViewType, recalculateBudget, addEmployee, updateEmployee, removeEmployee } from '../../actions/OrgchartAction';
import { OrgChart } from '../../actions/ActionType';
import MeritView from './MeritView';
import STIView from './STIView';
import LTIView from './LTIView';
import MasterView from './MasterView';
import VersionModal from './VersionModal';

const goObj = go.GraphObject.make;

class Organisation extends React.Component {
  constructor(props) {
    super(props);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.closeBudgetModalForm = this.closeBudgetModalForm.bind(this);
    this.budgetModalFormLoad = this.budgetModalFormLoad.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.onHierarchyChange = this.onHierarchyChange.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this.saveSimulationVersion = this.saveSimulationVersion.bind(this);
    this.deleteSimulationVersion = this.deleteSimulationVersion.bind(this);
    this.rangeSliderVal = 0;
    this.closeModal = this.closeModal.bind(this);
    this.state = { currentView: MasterView, isVersionModalOpen: false, currentVersion: 'UNSAVED_VERSION', myModel: null, myDiagram: null, data: props.budgets, selectedView: props.data_representation, selectedOption: 'master', selectedHierarchy: props.heirarchy_type };
  }

  componentWillMount() {
    this.props.dispatch(getEmployeeRatings());
    this.props.dispatch(recalculateBudget());
    this.props.dispatch(loadSimulationVersions());
  }
  componentWillReceiveProps(nextProps) {
    this.state.data = nextProps.budgets;
  }
  onBudgetViewChange = value => this.setState({ currentView: value });
  onViewChange = value => {
    this.props.dispatch(changeViewType(value));
    this.setState({
      selectedView: value
    });
  }
  onHierarchyChange(value) {
    this.props.dispatch(changeHierarchyType(value));
    this.setState({
      selectedHierarchy: value
    });
  }
  getVersionData(event) {
    if (this.state.currentVersion === 'UNSAVED_VERSION') {
      const x = confirm('The changes you`ve done will be lost. Do you want to continue?');
      if (x) {
        this.props.dispatch({ type: OrgChart.LOAD_SPECIFIC_VERSION, version: event.target.value });
      } else {
        this.setState({ currentVersion: event.target.value });
        document.getElementById(event.target.id).value = this.state.currentVersion;
      }
    } else {
      this.setState({ currentVersion: event.target.value });
      this.props.dispatch({ type: OrgChart.LOAD_SPECIFIC_VERSION, version: event.target.value });
    }
  }
  setCurrentVersion(event) {
    this.setState({ currentVersion: event.target.value });
  }
  closeModal(varName) {
    this.setState({ [varName]: false });
  }
  saveSimulationVersion() {
    this.setState({ isVersionModalOpen: true });
  }
  deleteSimulationVersion() {
    const selectedVersion = this.state.currentVersion;
    if (selectedVersion === 'UNSAVED_VERSION') {
      alert('please select the version to delete');
    } else {
      const x = confirm('Are you sure you want to delete this version?');
      if (x) {
        this.setState({ currentVersion: 'UNSAVED_VERSION' });
        document.getElementById('versions').value = 'UNSAVED_VERSION';
        this.props.dispatch(deleteSimulationVersion(selectedVersion));
      }
    }
  }
  handleSubmit() {
    const employeeId = document.getElementById('employee_id');
    const employeeAbs = document.getElementById('employee_abs');
    const employeeName = document.getElementById('employee_name');
    const employeeTarget = document.getElementById('employee_target');
    const obj = { target: employeeTarget.value, name: employeeName.value, abs: employeeAbs.value };
    this.props.dispatch(updateEmployee(employeeId.value, obj));
    this.closeBudgetModalForm();
  }
  // handleOnChange = (value) => {
  //   this.volume = value;
  // }
  handleChangeStart = () => {
    console.log('Change event started');
  };
  handleChange = sliderValue => {
    this.setState({
      volume: sliderValue
    });
  };
  handleChangeComplete = () => {
    this.props.dispatch({ type: OrgChart.CALCULATE_BUDGET, sliderData: this.state.volume });
  };
  // Handle merit slider change
  handleMeritChangeStart = () => {
    console.log('Merit slider change value started');
  };
  handleMeritChange = meritSliderValue => {
    this.setState({
      meritVolume: meritSliderValue
    });
  };
  handleMeritChangeComplete = () => {
    this.props.dispatch({ type: OrgChart.CALCULATE_BUDGET, meritSliderData: this.state.meritVolume });
  }
  // Handle LTI slider change
  handleLTIChangeStart = () => {
    console.log('LTI slider change value started');
  };
  handleMeritChange = ltiSliderValue => {
    this.setState({
      ltiVolume: ltiSliderValue
    });
  };
  handleLTIChangeComplete = () => {
    this.props.dispatch({ type: OrgChart.CALCULATE_BUDGET, ltiSliderData: this.state.ltiVolume });
  };
  // Chnaging the radio button event
  handleOptionChange(event) {
    this.state.currentView = event.target.value;
    this.setState({
      selectedOption: event.target.value
    });
  }
  closeBudgetModalForm() {
    this.setState({ budgetDetailsModalForm: false });
  }
  budgetModalFormLoad(dataObj) {
    const employeeid = document.getElementById('employeeId');
    employeeid.innerHTML = `<input name='' id="employee_id" type="hidden" className="form-control" value='${dataObj.key}' />`;//`${dataObj.name}`;
    const employeeName = document.getElementById('employeeName');
    employeeName.innerHTML = `<input name='' id="employee_name" type="text" className="form-control" value='${dataObj.name}' />`;//`${dataObj.name}`;
    const employeeAbs = document.getElementById('employeeAbs');
    employeeAbs.innerHTML = `<input name='' id="employee_abs" type="text" className="form-control" value='${dataObj.abs}' />`;
    const employeeTarget = document.getElementById('employeeTarget');
    employeeTarget.innerHTML = `<input name='' id="employee_target" type="text" className="form-control" value='${dataObj.target}' />`;
  }
  // onChange={this.handleOptionChange}
  renderCanvas() {
    function FlatTreeLayout() {
      go.TreeLayout.call(this);  // call base constructor
    }
    go.Diagram.inherit(FlatTreeLayout, go.TreeLayout);

    // This assumes the TreeLayout.angle is 90 -- growing downward
    /** @override */
    FlatTreeLayout.prototype.commitLayout = function () {
      go.TreeLayout.prototype.commitLayout.call(this);  // call base method first
      // find maximum Y position of all Nodes
      let y = -Infinity;
      this.network.vertexes.each((v) => {
        y = Math.max(y, v.node.position.y);
      });
      // move down all leaf nodes to that Y position, but keeping their X position
      this.network.vertexes.each((v) => {
        const node = v.node;
        if (node.isTreeLeaf) {
          node.position = new go.Point(node.position.x, y);
        }
      });
    };

    const model = goObj(go.TreeModel);
    /*const diagram = goObj(go.Diagram, this.goJsDiv, {
      allowCopy: false,
      allowDelete: false,
      allowMove: false,
      initialContentAlignment: go.Spot.Center,
      initialAutoScale: go.Diagram.Uniform,
      layout:
        goObj(FlatTreeLayout,  // custom Layout, defined below
          { angle: 90,
            compaction: go.TreeLayout.CompactionNone }),
      'undoManager.isEnabled': true
    });*/

    let diagram = null;

    let nodeIdCounter = -1; // use a sequence to guarantee key uniqueness as we add/remove/modify nodes

    // This function is used to find a suitable ID when modifying/creating nodes.
    // We used the counter combined with findNodeDataForKey to ensure uniqueness.
    const getNextKey = () => {
      let key = nodeIdCounter;
      while (diagram.model.findNodeDataForKey(key) !== null) {
        key = nodeIdCounter;
        nodeIdCounter -= 1;
      }
      return key;
    };

    diagram = goObj(go.Diagram, this.goJsDiv, {
      initialContentAlignment: go.Spot.Center,
      maxSelectionCount: 1, // users can select only one part at a time
      validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
      'clickCreatingTool.archetypeNodeData': {}, // allow double-click in background to create a new node
      'clickCreatingTool.insertPart': (loc) => {  // customize the data for the new node
        this.archetypeNodeData = {
          key: getNextKey(), // assign the key based on the number of nodes
          name: '(new employee)',
          title: '(job title)',
          parentName: '',
          budget: ''
        };
        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
      },
      layout:
        goObj(go.TreeLayout,
          {
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal,
            // properties for most of the tree:
            angle: 90,
            layerSpacing: 35,
            // properties for the 'last parents':
            alternateAngle: 90,
            alternateLayerSpacing: 35,
            alternateAlignment: go.TreeLayout.AlignmentBus,
            alternateNodeSpacing: 20
          }),
      'undoManager.isEnabled': true // enable undo & redo
    });

    diagram.addDiagramListener('Modified', (e) => {
      console.log(e);
      const button = document.getElementById('SaveButton');
      if (button) button.disabled = !diagram.isModified;
      const idx = document.title.indexOf('*');
      if (diagram.isModified) {
        if (idx < 0) document.title += '*';
      } else if (idx >= 0) {
        document.title = document.title.substr(0, idx);
      }
    });

    // manage boss info manually when a node or link is deleted from the diagram
    diagram.addDiagramListener('SelectionDeleting', (e) => {
      const part = e.subject.first(); // e.subject is the myDiagram.selection collection,
                                    // so we'll get the first since we know we only have one selection
      diagram.startTransaction('clear boss');
      if (part instanceof go.Node) {
        const it = part.findTreeChildrenNodes(); // find all child nodes
        while (it.next()) { // now iterate through them and clear out the boss information
          const child = it.value;
          const bossText = child.findObject('boss'); // since the boss TextBlock is named, we can access it by name
          if (bossText === null) return;
          bossText.text = '';
        }
      } else if (part instanceof go.Link) {
        const child = part.toNode;
        const bossText = child.findObject('boss'); // since the boss TextBlock is named, we can access it by name
        if (bossText === null) return;
        bossText.text = '';
      }
      diagram.commitTransaction('clear boss');
    });

    const levelColors = ['#AC193D', '#2672EC', '#8C0095', '#5133AB', '#008299', '#D24726', '#008A00', '#094AB2'];

    // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
    diagram.layout.commitNodes = () => {
      go.TreeLayout.prototype.commitNodes.call(diagram.layout);  // do the standard behavior
      // then go through all of the vertexes and set their corresponding node's Shape.fill
      // to a brush dependent on the TreeVertex.level value
      diagram.layout.network.vertexes.each((v) => {
        if (v.node) {
          const level = v.level % (levelColors.length);
          const color = levelColors[level];
          const shape = v.node.findObject('SHAPE');
          if (shape) shape.fill = goObj(go.Brush, 'Linear', { 0: color, 1: go.Brush.lightenBy(color, 0.05), start: go.Spot.Left, end: go.Spot.Right });
        }
      });
    };


    // when a node is double-clicked, add a child to it
    const nodeDoubleClick = (e, obj) => {
      const clicked = obj.part;
      if (clicked !== null) {
        const thisemp = clicked.data;
        this.props.dispatch(addEmployee(thisemp.key));
      }
    };

    // this is used to determine feedback during drags
    const mayWorkFor = (node1, node2) => {
      if (!(node1 instanceof go.Node)) return false;  // must be a Node
      if (node1 === node2) return false;  // cannot work for yourself
      if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
      return true;
    };


    // This function provides a common style for most of the TextBlocks.
    // Some of these values may be overridden in a particular TextBlock.
    const textStyle = { font: '9pt  Segoe UI,sans-serif', stroke: 'white' };
    // This converter is used by the Picture.
    const findHeadShot = (key) => {
      if (key < 0 || key > 16) return 'images/HSnopic.png'; // There are only 16 images on the server
      //return `images/HS${key}.png`;
      return 'assets/images/icons/avatar-man.png';
    };

    /*eslint no-underscore-dangle: [2, { "allow": ["foo_", "_prevFill"] }]*/
    // define the Node template
    diagram.nodeTemplate =
      goObj(go.Node, 'Auto',
        { doubleClick: nodeDoubleClick },
        { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
          mouseDragEnter: (e, node, prev) => {
            console.log('Prev', node.Zd, prev);
            const diag = node.diagram;
            const selnode = diag.selection.first();
            if (!mayWorkFor(selnode, node)) return;
            const shape = node.findObject('SHAPE');
            if (shape) {
              shape._prevFill = shape.fill;  // remember the original brush
              shape.fill = 'darkred';
            }
          },
          mouseDragLeave: (e, node, next) => {
            console.log('next 1', node.Zd, next);
            const shape = node.findObject('SHAPE');
            if (shape && shape._prevFill) {
              shape.fill = shape._prevFill;  // restore the original brush
            }
          },
          mouseDrop: (e, node) => {
            const diag = node.diagram;
            console.log('selnode change', node.Zd);
            const selnode = diag.selection.first();
            console.log('selnode', selnode.Zd);  // assume just one Node in selection
            this.props.dispatch({ type: 'CHANGE_EMPLOYEE', parentNodeData: node.Zd, selChildNodeData: selnode.Zd });
            if (mayWorkFor(selnode, node)) {
              // find any existing link into the selected node
              const link = selnode.findTreeParentLink();
              if (link !== null) {  // reconnect any existing link
                link.fromNode = node;
              } else {  // else create a new link
                diag.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
              }
            }
          }
        },
        // for sorting, have the Node.text be the data.name
        new go.Binding('text', 'name'),
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected
        new go.Binding('layerName', 'isSelected', (sel) => (sel ? 'Foreground' : '')).ofObject(),
        // define the node's outer shape
        goObj(go.Shape, 'Rectangle',
          {
            name: 'SHAPE',
            fill: 'white',
            stroke: null,
            // set the port properties:
            portId: '',
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer'
          }),
        goObj(go.Panel, 'Horizontal',
          goObj(go.Picture,
            {
              name: 'Picture',
              desiredSize: new go.Size(60, 70),
              margin: new go.Margin(0, 8, 0, 8)
            },
            new go.Binding('source', 'key', findHeadShot)),
          // define the panel where the text will appear
          goObj(go.Panel, 'Table',
            {
              maxSize: new go.Size(350, 1099),
              margin: new go.Margin(6, 10, 6, 3),
              defaultAlignment: go.Spot.Left
            },
            goObj(go.RowColumnDefinition, { column: 2, width: 4 }),
            goObj(go.TextBlock, textStyle,  // the name
              {
                row: 0,
                column: 0,
                font: '12pt Segoe UI,sans-serif'
              },
              new go.Binding('text', 'name').makeTwoWay()),
            goObj(go.TextBlock, textStyle,  // the name
              {
                row: 0,
                column: 1,
                font: '8pt Segoe UI,sans-serif',
                margin: new go.Margin(6, 0, 0, 6)
              },
              new go.Binding('text', 'title').makeTwoWay()),
            goObj(go.TextBlock, '-----------------------------', textStyle,
              { row: 2, column: 0, columnSpan: 5 }),
            goObj(go.TextBlock, 'Merit ', textStyle,
              { row: 3, column: 0, width: 50 }),
            goObj(go.TextBlock, textStyle,
              { row: 4, column: 0, width: 50, text: 'row 2\ncol 0' },
              new go.Binding('text', 'MERIT').makeTwoWay()),
            goObj(go.TextBlock, 'STI', textStyle,
                { row: 3, column: 1, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 4, column: 1, width: 50, text: 'row 2\ncol 1' },
              new go.Binding('text', 'STI').makeTwoWay()),
            goObj(go.TextBlock, 'LTI', textStyle,
              { row: 3, column: 3, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 4, column: 3, width: 50, text: 'row 2\ncol 3' },
              new go.Binding('text', 'budget').makeTwoWay()),
              // test
              goObj(go.TextBlock, '-----------------------------', textStyle,
              { row: 5, column: 0, columnSpan: 5 }),
              goObj(go.TextBlock, 'IPF ', textStyle,
              { row: 6, column: 0, width: 50 }),
            goObj(go.TextBlock, textStyle,
              { row: 7, column: 0, width: 50, text: 'row 4\ncol 0' },
              new go.Binding('text', 'IPF').makeTwoWay()),
            goObj(go.TextBlock, 'BPF', textStyle,
                { row: 6, column: 1, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 7, column: 1, width: 50, text: 'row 4\ncol 1' },
              new go.Binding('text', 'BPF').makeTwoWay()),
            goObj(go.TextBlock, 'CPF', textStyle,
              { row: 6, column: 3, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 7, column: 3, width: 50, text: 'row 4\ncol 3' },
              new go.Binding('text', 'CPF').makeTwoWay())
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node

    // the context menu allows users to make a position vacant,
    // remove a role and reassign the subtree, or remove a department
    diagram.nodeTemplate.contextMenu =
      goObj(go.Adornment, 'Vertical',
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Vacate Position'),
          {
            click: (e, obj) => {
              const node = obj.part.adornedPart;
              if (node !== null) {
                const thisemp = node.data;
                diagram.startTransaction('vacate');
                // update the key, name, and comments
                diagram.model.setKeyForNodeData(thisemp, getNextKey());
                diagram.model.setDataProperty(thisemp, 'name', '(Vacant)');
                diagram.model.setDataProperty(thisemp, 'comments', '');
                diagram.commitTransaction('vacate');
              }
            }
          }
        ),
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Remove Employee'),
          {
            click: (e, obj) => {
              // reparent the subtree to this node's boss, then remove the node
              const node = obj.part.adornedPart;
              if (node !== null) {
                diagram.startTransaction('reparent remove');
                const chl = node.findTreeChildrenNodes();
                // iterate through the children and set their parent key to our selected node's parent key
                while (chl.next()) {
                  const emp = chl.value;
                  diagram.model.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key);
                }
                // and now remove the selected node itself
                diagram.model.removeNodeData(node.data);
                console.log('bugin', node.data);
                this.props.dispatch(removeEmployee(node.data.key));
                diagram.commitTransaction('reparent remove');
              }
            }
          }
        ),
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Remove Department'),
          {
            click: (e, obj) => {
              // remove the whole subtree, including the node itself
              const node = obj.part.adornedPart;
              if (node !== null) {
                diagram.startTransaction('remove dept');
                diagram.removeParts(node.findTreeParts());
                diagram.commitTransaction('remove dept');
              }
            }
          }
        ),
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Edit Employee'),
          {
            click: (e, obj) => {
              const node = obj.part.adornedPart;
              console.log('node', node);
              console.log('Tree Parts', node.Zd.key);
              console.log('Data', this.state.data);
              this.setState({ budgetDetailsModalForm: true });
              this.budgetModalFormLoad(node.Zd);
            }
          }
        )
      );

    // define the Link template
    diagram.linkTemplate =
      goObj(go.Link, go.Link.Orthogonal,
        { corner: 5, relinkableFrom: true, relinkableTo: true },
        goObj(go.Shape, { strokeWidth: 4, stroke: '#00a4a4' }));  // the link shape


    this.setState({ myModel: model, myDiagram: diagram },
      () => {
        model.nodeDataArray = this.state.data;//this.props.data;
        diagram.model = model;
        this.setState({ myModel: model, myDiagram: diagram });
      }
    );
  }
  render() {
    console.log(this.props.budgets, 'this.props.budgets');
    const HierarchyViewToggleOptions = [
      {
        displayName: 'CPM',
        value: 'cpm_manager'
      },
      {
        displayName: 'OPM',
        value: 'operational_manager'
      }
    ];
    const GridTypeToggleOptions = [
      {
        displayName: 'Chart',
        value: 'chart'
      },
      {
        displayName: 'Table',
        value: 'table'
      }
    ];
    const budgetViewToggleOptions = [
      {
        displayName: 'Master',
        value: 1
      },
      {
        displayName: 'Merit',
        value: 2
      },
      {
        displayName: 'STI',
        value: 3
      },
      {
        displayName: 'LTI',
        value: 4
      }
    ];
    const styles = {
      overlay: {
        position: 'fixed',
        top: 50,
        left: 380,
        right: 380,
        bottom: 50
      },
      content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
      }
    };
    const formModal = (<Modal isOpen={this.state.budgetDetailsModalForm} style={styles} contentLabel="Modal">
      <div className="card card-success">
        <div className="card-header">
          Budget Management
          <button type="button" id="close" onClick={this.closeBudgetModalForm} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="budgetDetailsForm">
            <label htmlFor="employeeId" id="employeeId" />
            <div className="form-group">
              <label htmlFor="managerName">Name</label>
              <span className="modal-input">:&nbsp;<label htmlFor="managerName" id="employeeName" /></span>
            </div>
            <div className="form-group">
              <label htmlFor="employeeAbs">Employee ABS</label>
              <span className="modal-input">:&nbsp;<label htmlFor="employeeAbs" id="employeeAbs" /></span>
              {/* <input type="text" name="jobTitle" id="jobTitle" className="form-control" /> */}
              {/* <label htmlFor="managerBudget" id="managerBudget" /> */}
            </div>
            <div className="form-group">
              <label htmlFor="employeeTarget">Target</label>
              <span className="modal-input">:&nbsp;<label htmlFor="employeeTarget" id="employeeTarget" /></span>
              {/* <input type="text" name="jobTitle" id="jobTitle" className="form-control" /> */}
              {/* <label htmlFor="managerBudget" id="managerBudget" /> */}
            </div>
            <div className="form-group">
              <input type="button" onClick={() => this.handleSubmit()} value="submit" className="form-control btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </Modal>);
    const mainControls = (<div className="row">
      <div className="col-xs-3 budget_view_options"><MultiToggle
        options={budgetViewToggleOptions}
        selectedOption={this.state.currentView}
        onSelectOption={this.onBudgetViewChange}
        label="Budget View"
      /></div>
      <div className="col-xs-3 hierarchy_view_options"><MultiToggle
        options={HierarchyViewToggleOptions}
        selectedOption={this.state.selectedHierarchy}
        onSelectOption={this.onHierarchyChange}
        label="Hierarchy"
      /></div>
      <div className="col-xs-3 grid_view_options"><MultiToggle
        options={GridTypeToggleOptions}
        selectedOption={this.state.selectedView}
        onSelectOption={this.onViewChange}
        label="Representation"
      /></div>
      <div className="col-xs-3 version_selection">
        <div className="toggle-wrapper">
          <label>Choose Version to Load</label>
          <div className="toggleContainer">
            <select defaultValue={this.state.currentVersion} id="versions" onFocus={(event) => this.setCurrentVersion(event)} onChange={(event) => this.getVersionData(event)}>
              <option value="UNSAVED_VERSION">Select</option>
              {
                this.props.versions.map((version) => {
                  const versionName = version.versionName;
                  return <option value={version.id}>{versionName}</option>;
                })
              }
            </select>
          </div>
        </div>
      </div>
      <div className="col-xs-3 version_selection">
        <div className="toggle-wrapper">
          <label>Actions</label>
          <Button
            className="addButton version_add"
            onClick={this.saveSimulationVersion}
            disabled={this.state.currentVersion !== 'UNSAVED_VERSION'}
          >
            <i className="fas fa-plus-square" aria-hidden="true" />
          </Button>
          <a
            className="btn-action btn-delete"
            onClick={this.deleteSimulationVersion}
            title="delete selected version"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.21 17.7"><title>delete</title><path d="M13,3.19h.87V2H8.59V.38h-3V2H.38V3.19h.87V15a2.36,2.36,0,0,0,2.36,2.36h7A2.36,2.36,0,0,0,13,15ZM11.74,15A1.14,1.14,0,0,1,10.6,16.1h-7A1.14,1.14,0,0,1,2.47,15V3.19h9.26Z" fill="#175d9d" stroke="#175d9d" strokeMiterlimit="10" strokeWidth="0.75" /></svg>
          </a>
        </div>
      </div>
    </div>);
    if (this.state.currentView === 2) {
      return (
        <div className="container">
          {
            mainControls
          }
          <div className="row">
            <MeritView viewType={this.state.selectedView} />
            {
              formModal
            }
          </div>
        </div>
      );
    } else if (this.state.currentView === 3) {
      return (
        <div className="container">
          {
            mainControls
          }
          <div className="row">
            <STIView viewType={this.state.selectedView} />
            {
              formModal
            }
          </div>
        </div>
      );
    } else if (this.state.currentView === 4) {
      return (
        <div className="container">
          {
            mainControls
          }
          <div className="row">
            <LTIView viewType={this.state.selectedView} />
            {
              formModal
            }
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        {
          mainControls
        }
        <div className="row">
          <MasterView viewType={this.state.selectedView} />
          {
            formModal
          }
        </div>
        <VersionModal lti_range={this.props.orgChartReducer.lti_range} ipf_range={this.props.orgChartReducer.ipf_range} merit_range={this.props.orgChartReducer.merit_range} budgets={this.props.budgets} current_employee_id={this.props.current_employee_id} closeModal={this.closeModal} isOpen={this.state.isVersionModalOpen} />
      </div>
    );
  }
}
function MapStateToProps(state) {
  return {
    budgets: state.OrgchartReducer.formattedBudget,
    heirarchy_type: state.OrgchartReducer.current_view,
    data_representation: state.OrgchartReducer.data_representation,
    current_employee_id: state.OrgchartReducer.employee_id,
    versions: state.OrgchartReducer.comp_versions,
    orgChartReducer: state.OrgchartReducer
  };
}
export default connect(MapStateToProps)(Organisation);
