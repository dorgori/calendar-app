import * as React from 'react';
import { css } from 'office-ui-fabric-react';

export interface ICustomTooolbarProps {
    view: string;
    views: string[];
    label: any;
    localizer: any;
    onNavigate: (action: any) => void;
    onView: (view: any) => void;
    onViewChange: (view: any) => void;
    messages: any;
}

export const navigateContants = {
    PREVIOUS: 'PREV',
    NEXT: 'NEXT',
    TODAY: 'TODAY',
    DATE: 'DATE'
};

export const views = {
    MONTH: 'month',
    WEEK: 'week',
    WORK_WEEK: 'work_week',
    DAY: 'day',
    AGENDA: 'agenda'
};

const CustomToolbar: React.SFC<ICustomTooolbarProps> = (props) => {
    function navigate(action) {
        props.onNavigate(action);
    }

    function viewItem(view) {
        props.onViewChange(view);
    }

    function viewNamesGroup(messages) {
        const viewNames = props.views;
        const view = props.view;

        if (viewNames.length > 1) {
            return viewNames.map((name) => (
                <button
                    type="button"
                    key={name}
                    className={css({ 'rbc-active': view === name })}
                    onClick={viewItem.bind(null, name)}>
                    {messages[name]}
                </button>
            ));
        }
    }

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" onClick={navigate.bind(null, navigateContants.TODAY)}>
                    Current month
                </button>
                <button type="button" onClick={navigate.bind(null, navigateContants.PREVIOUS)}>
                    Previous month
                </button>
                <button type="button" onClick={navigate.bind(null, navigateContants.NEXT)}>
                    Next month
                </button>
            </span>

            <span className="rbc-toolbar-label">{props.label}</span>

            <span className="rbc-btn-group">{viewNamesGroup(props.messages)}</span>
        </div>
    );
};

export default CustomToolbar;