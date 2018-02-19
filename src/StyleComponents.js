import styled from 'styled-components';


export const Input = styled.input.attrs({
  // we can define static props
  type: 'search',

  // or we can define dynamic ones
  margin: props => props.size || '1em',
  padding: props => props.size || '1em'
})`
  color: LightBlue;
  font-size: 1em;
  border: 2px solid LightBlue;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;



export const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? 'LightBlue' : 'white'};
  color: ${props => props.primary ? 'white' : 'LightBlue'};

  font-size: 1em;
  margin: .5em;
  padding: 0.25em 1em;
  border: 2px solid LightBlue;
  border-radius: 3px;
  cursor: pointer;
`;

