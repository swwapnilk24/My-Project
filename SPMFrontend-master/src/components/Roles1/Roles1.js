import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

class Roles1 extends Component {
  constructor() {
    super();
    this.state = {
      check: true,
      columns: [{ key: 'roles', name: 'Roles' }],
      rows: [{ roles: 'HR Manager' }, { roles: 'Payroll Admin' }, { roles: 'RMG' }, { roles: 'Management' }]
    };
  }

  rowGetterTest(parameter) {
    console.log(parameter);
    return this.state.rows[parameter];
  }

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetterTest}
          rowsCount={this.state.rows.length}
          minHeight={200}
          enableCellSelect
          onCellSelected = {this.getRowID}
          showCheckbox = {this.state.check}
          rowSelection={{
            showCheckbox: true,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}
          enableRowSelect ={false}
        />
      </div>
    );
  }
}

export default Roles1;

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Checkbox from './Checkbox';
// import { RolesApprovalData } from '../../actions/RolesApprovalActions';

// const items = [
//   'HR Manager',
//   'Payroll Admin',
//   'RMG',
//   'Management'
// ];

// const subjects = [
//   'self',
//   'others'
// ];

// class Roles extends Component {
//   constructor() {
//     super();
//     this.submit = this.submit.bind(this);
//     this.state = {
//       value: 0
//     };
//   }
//   // componentWillMount = () => {
//   //   this.selectedCheckboxes = new Set();
//   //   console.log(this.state.value);
//   // }
//   componentWillReceiveProps = () => {
//     this.selectedCheckboxes = new Set();
//   }

//   submit() {
//     console.log(this.selectedCheckboxes);
//     console.log(this.state.value);
//     function logSetElements(value2) {
//       console.log(value2);
//     }
//     new Set().forEach(logSetElements);
//     this.props.dispatch(
//       RolesApprovalData({ value: this.selectedCheckboxes, field: this.state.value })
//     );
//   }

//   toggleCheckbox = label => {
//     let val = '';
//     const formDat = document.forms.formName;
//     const sub = formDat.subject;
//     val = sub.options[sub.selectedIndex].text;
//     this.setState({ value: val }, () => {
//     });
//     if (this.selectedCheckboxes.has(label)) {
//       this.selectedCheckboxes.delete(label);
//     } else {
//       this.selectedCheckboxes.add(label);
//     }
//   }

//   handleFormSubmit = formSubmitEvent => {
//     formSubmitEvent.preventDefault();
//     console.log('hi');
//   }

//   createCheckbox = label => (
//     <Checkbox
//       label={label}
//       handleCheckboxChange={this.toggleCheckbox}
//       key={label}
//     />
//   )

//   createCheckboxes = () => (
//     items.map(this.createCheckbox)
//   )

//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//             <h2>Roles</h2>
//             <form onSubmit={this.handleFormSubmit} name = "formName">
//               <select name="subject">
//                 {
//                 subjects.map((values) =>
//                   <option value={values}>{values}</option>
//                 )
//                 }
//               </select>
//               {this.createCheckboxes()}
//               <button className="btn btn-default" type="submit" onClick = {this.submit} >Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   console.log('Data ', state);
//   return { rolesApprovalData: state.rolesApproval.rolesApprovalData, masterInfo: state.masterData.currentMasterData, auditData: state.auditTrail.currentEmployee };
// }

// export default connect(mapStateToProps)(Roles);

