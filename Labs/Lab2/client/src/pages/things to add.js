things to add 

const hide = () => {
  $('ul').hide();
};
const show = () => {
  $('ul').show();
};
<button onClick={hide}>Hide List</button>
<button onClick={show}>Show List</button>


const slideUp = () => {
    $('table').slideUp();
  };
  const slideDown = () => {
    $('table').slideDown();
  };
  <button onClick={slideUp}>Slide Up Table</button>
  <button onClick={slideDown}>Slide Down Table</button>
  

  const toggle = () => {
    $('ul').toggle();
  };
  <button onClick={toggle}>Toggle List</button>

  
  const addClass = () => {
    $('ul').addClass('highlight');
  };
  <button onClick={addClass}>Add Highlight Class</button>

  
  const removeClass = () => {
    $('ul').removeClass('highlight');
  };
  <button onClick={removeClass}>Remove Highlight Class</button>
  