export class MoviesApi {
    constructor({ url }) {//на входе некий обьект с url 
        this._url = url;
    }
    //приватный метод ответа сервера
    _getResponse(res) {
        //console.log(response)
        if (res.ok) {
            return res.json();//дай мне ответ в формате json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    async getMovies(title) {
        if (!this.savedMoives) {
            const res = await fetch(`${this._url}`, {
                method: 'GET',
            })           
            this.savedMoives = await this._getResponse(res);
        }

        return this.savedMoives;
    }

    resetSave() {
        this.savedMoives = null;
    }
}

//создание экземпляра класса MoviesApi
export const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies'
});