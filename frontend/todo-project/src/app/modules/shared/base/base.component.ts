import { ReplaySubject, Subscription } from 'rxjs';

export abstract class BaseComponent {
    private _subscriptions: Subscription[] = [];
    private _unsubscribedNotifer$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    protected ngUnsubscribe(): ReplaySubject<boolean> {
        return this._unsubscribedNotifer$;
    }

    protected destroyAction() {
        if (this._subscriptions && this._subscriptions.length) {
            this._subscriptions.forEach((subscription) => subscription.unsubscribe());
        }

        this._unsubscribedNotifer$.next(true);
        this._unsubscribedNotifer$.complete();
    }
}