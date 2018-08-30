import api from '../../utils/api';

function getTotalStatistic() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/statistics/total')
            .then(res => {
                dispatch({ type: 'SET_TOTAL_STATISTIC', payload:{totalStatistic: res} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

function getTodayStatistic() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api.get('/statistics/today')
            .then(res => {
                dispatch({ type: 'SET_TODAY_STATISTIC', payload:{todayStatistic: res} })
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}

export default {
    getTotalStatistic,
    getTodayStatistic
}