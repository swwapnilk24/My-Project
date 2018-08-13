/**
 * @file Organisation Component.
 * @author Mahesh
 */
import React from 'react';
import go from 'gojs';
import MultiToggle from 'react-multi-toggle';
import { connect } from 'react-redux';
import './Organisation.scss';
import { recalculateBudget } from '../../actions/OrgchartAction';
import { OrgChart } from '../../actions/ActionType';
import DataGrid from './DataGrid';

const goObj = go.GraphObject.make;
const rawData = [];

class Organisation extends React.Component {
  constructor(props) {
    super(props);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.rangeSliderVal = 0;
    this.onMeritChange = this.onMeritChange.bind(this);
    this.state = { myModel: null, myDiagram: null, data: rawData, currentMerit: props.merit_range, volume: props.merit_range };
  }

  componentWillMount() {
    this.props.dispatch(recalculateBudget(this.state.volume, 'merit'));
    this.state.data = this.props.budgets;
  }
  componentDidMount() {
    this.renderCanvas();
    this.setViewType(this.props.viewType);
  }
  componentWillReceiveProps(nextProps) {
    this.state.data = nextProps.budgets;
    this.reloadCanvas();
    this.setViewType(nextProps.viewType);
  }
  componentWillUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const model = this.state.myModel;
      const diagram = this.state.myDiagram;
      model.nodeDataArray = this.state.data;//this.props.data;
      diagram.model = model;
      this.setState({ myModel: model, myDiagram: diagram, value: 10 });
    }
  }
  onMeritChange(value) {
    this.setState({ currentMerit: value });
    this.props.dispatch({ type: OrgChart.CALCULATE_BUDGET, merit: value });
  }
  setViewType(viewType) {
    if (viewType === 'chart') {
      document.getElementById('chartview').style.display = 'block';
      document.getElementById('tableview').style.display = 'none';
      document.getElementById('meritSlider').style.backgroundColor = 'White';
    } else {
      document.getElementById('chartview').style.display = 'none';
      document.getElementById('tableview').style.display = 'block';
      document.getElementById('meritSlider').style.backgroundColor = 'transparent';
    }
  }
  reloadCanvas() {
    console.log('Updating again');
    const model = this.state.myModel;
    const diagram = this.state.myDiagram;
    model.nodeDataArray = this.state.data;//this.props.data;
    diagram.model = model;
    this.setState({ myModel: model, myDiagram: diagram });
  }
  // Handle merit slider change
  handleMeritChangeStart = () => {
    console.log('Merit slider change value started');
  };
  handleMeritChange = meritSliderValue => {
    this.setState({
      volume: meritSliderValue
    });
  };
  handleMeritChangeComplete = () => {
    this.props.dispatch({ type: OrgChart.CALCULATE_BUDGET, merit: this.state.volume });
  }
  handleMeritChange = ltiSliderValue => {
    this.setState({
      volume: ltiSliderValue
    });
  };
  // Chnaging the radio button event
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
            goObj(go.TextBlock, 'ABS ', textStyle,
              { row: 3, column: 0, width: 50 }),
            goObj(go.TextBlock, textStyle,
              { row: 4, column: 0, width: 50, text: 'row 2\ncol 0' },
              new go.Binding('text', 'ABS').makeTwoWay()),
            goObj(go.TextBlock, 'Merit', textStyle,
                { row: 3, column: 1, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 4, column: 1, width: 50, text: 'row 2\ncol 1' },
              new go.Binding('text', 'MERIT').makeTwoWay()),
            goObj(go.TextBlock, 'Budget', textStyle,
              { row: 3, column: 3, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 4, column: 3, width: 50, text: 'row 2\ncol 3' },
              new go.Binding('text', 'MeritBudget').makeTwoWay())
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node

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
    const gridOptions = [{
      name: 'Name',
      key: 'name'
    }, {
      name: 'Job Title',
      key: 'title'
    }, {
      name: 'ABS',
      key: 'ABS'
    },
    {
      name: 'Merit Amount',
      key: 'MERIT'
    },
    {
      name: 'New ABS',
      key: 'NewABS'
    },
    {
      key: 'MeritBudget',
      name: 'Merit Budget'
    }];
    let ChartView = '';
    let TableView = '';
    ChartView = <div id="chartview"><div ref={(goJsDiv) => { this.goJsDiv = goJsDiv; }} style={{ height: '600px', backgroundColor: '#FFFFFF' }} /></div>;
    TableView = <div id="tableview"><DataGrid expanded={this.props.merit_table_expanded} current_view={'merit'} hierarchy={this.props.orgHierarchy} columns={gridOptions} data={this.state.data} /></div>;
    const MeritOptions = [
      {
        displayName: 'Min',
        value: 'min'
      },
      {
        displayName: 'Mid',
        value: 'mid'
      },
      {
        displayName: 'Max',
        value: 'max'
      }
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="slider" id="meritSlider">
              <MultiToggle
                options={MeritOptions}
                selectedOption={this.state.currentMerit}
                onSelectOption={this.onMeritChange}
                label="Merit Range"
              />
            </div>
            {ChartView}
            {TableView}
          </div>
        </div>
      </div>
    );
  }
}
function MapStateToProps(state) {
  return {
    budgets: state.OrgchartReducer.formattedBudget,
    merit_range: state.OrgchartReducer.merit_range,
    orgHierarchy: state.OrgchartReducer.org_hierarchy,
    merit_table_expanded: state.OrgchartReducer.merit_table_expanded
  };
}
export default connect(MapStateToProps)(Organisation);
