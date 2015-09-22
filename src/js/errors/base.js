class AjaxError {
    constructor(jqXhr, textStatus, errorThrown) {
        let message = [jqXhr ? jqXhr.status : 'Unknown error, seems 404', errorThrown || ''];

        console.warn(...message);
    }
}

export default AjaxError;