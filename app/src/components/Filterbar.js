import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export default function Filterbar({onFiltered, status}) {  
    function handleClick(e){
      e.preventDefault(); 
      // on change if selection is different from current one
      if(e.target.value && status !== e.target.value) onFiltered(e.target.value);
    }

    return (
      <div>
        <ButtonToolbar>
          <ButtonGroup className="m-2 p-2" aria-label="Filter Tasks By Status" onClick={handleClick}>
              <Button variant="secondary" value="To Do" disabled={status === 'To Do'}>To Do</Button>
              <Button variant="secondary" value="In Progress" disabled={status === 'In Progress'}>In Progress</Button>
              <Button variant="secondary" value="Done" disabled={status === 'Done'}>Done</Button>
              <Button variant="secondary" value="All"  disabled={status === 'All'}>All</Button>
            </ButtonGroup>
        </ButtonToolbar>
      </div>
      );
}