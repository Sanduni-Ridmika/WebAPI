import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';

export class Department extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false}
    }
    
    refreshList(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    ComponentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {deps}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        return(
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>DepartmentId</th>
                    <th>DepartmentName</th>
                    <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>Edit | Delete</td>
                        </tr>
                        )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                    Add Department
                </Button>

                <AddDepModal show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
        </div>
        )
    }
}