const useDebounce = () => {
    const debounce = (func, timeout = 300) => {
        let timer;
        return (...agrs) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...agrs);
            }, timeout)
        }
    };
    return { debounce }
}
export default useDebounce