import classes from './Input.module.css';

const Input = (props) => {

    let inputElement = null;

    let inputClasses = [classes.InputElement];

    inputClasses.push(!props.valid && props.visited ? classes.invalid : null);

    switch (props.type) {
        case 'input':
            inputElement = <input id={props.id} className={inputClasses.join(' ')} {...props.config} value={props.value} onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea id={props.id} className={inputClasses.join(' ')} {...props.config} value={props.value} onChange={props.changed} />
            break;
        case 'select':
            inputElement = (
                <select id={props.id} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.config.options ? props.config.options.map((option) => (<option key={option.value} value={option.value}>{option.display}</option>)) : null}
                </select>
            );
            break;
        default:
            inputElement = <input id={props.id} className={inputClasses.join(' ')} {...props.config} value={props.value} onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            <label htmlFor={props.id} className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;