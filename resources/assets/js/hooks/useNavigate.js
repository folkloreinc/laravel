import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useUrlGenerator } from '../contexts/RoutesContext';

const useNavigate = (routeName, opts) => {
    const history = useHistory();
    const route = useUrlGenerator();

    const url = useMemo(() => route(routeName, opts), [route, routeName, opts]);

    const push = useCallback(() => history.push(url), [url, history]);
    const replace = useCallback(() => history.replace(url), [url, history]);
    const back = useCallback(() => history.goBack(), [history]);

    return { push, replace, back };
};

export default useNavigate;
