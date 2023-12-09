function useDebounce (cb, delay = 2000){
    let timerId;
    return(...args) => {
        clearTimeout(timerId);   //To clear old timeout
        timerId = setTimeout(()=>{
            cb(...args);
        },delay)
    }

}
export default useDebounce;
