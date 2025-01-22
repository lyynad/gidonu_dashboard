import '../styles/popup.css';

interface Props {
    message: string
}

const Popup = ({message}: Props) => {
    return (
        <>
            <div className="popupBlock">
                <span>{message}</span>
            </div>
        </>
    )
}

export default Popup;