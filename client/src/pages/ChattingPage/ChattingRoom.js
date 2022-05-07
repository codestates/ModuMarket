import TextField from '@material-ui/core/TextField';

function ChattingRoom({state, onTextChange, onMessageSubmit, renderChat}) { 

    return (
        <div>
            <form onSubmit={onMessageSubmit}>
                <h1>나의 채팅 서비스</h1>
                <div>이름</div>
                <div>
                    <TextField name ="name" onChange={onTextChange} value={state.name} label="Name"></TextField>
                </div>
                <p></p>
                <TextField name ="message" placeholder="채팅을 입력해 보세요." onChange={onTextChange} value={state.message} variant="outlined" label="Message"></TextField>
                <p></p>
                <button>보내기</button>
            </form>
            <div>
                <h1>채팅 기록</h1>
                {renderChat()}
            </div>
        </div>
    )
}
export default ChattingRoom;