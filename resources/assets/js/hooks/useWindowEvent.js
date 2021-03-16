import { useEffect } from 'react';
import EventsManager from '../lib/EventsManager';

const eventsManager = new EventsManager(window);

const useWindowEvent = (event, callback) => {
    useEffect(() => {
        eventsManager.subscribe(event, callback);
        return () => {
            eventsManager.unsubscribe(event, callback);
        };
    }, [event, callback]);
};

export default useWindowEvent;
