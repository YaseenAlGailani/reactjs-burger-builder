import React from 'react'
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {

    return (
        <>
            <Backdrop shown={props.modalShown} clicked={props.hideModal} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.modalShown ? 'translateY(0)' : 'translateY(-200%)',
                    opacity: props.modalShown ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </>
    )
}

const checkProps = (prevProps, nextProps) => {
    return (prevProps.modalShown === nextProps.modalShown && prevProps.children === nextProps.children);
}

export default React.memo(Modal, checkProps);