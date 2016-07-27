const INTERVAL = 5e3;

global["msStats"] = {

    _stats: {},
    timeout: null,

    log(action, ms) {

        if (!(action in this._stats))
            this._stats[action] = { r: 0, ms: 0 };

        this._stats[action].r++;
        this._stats[action].ms += +ms;

    },

    schedule() {
        this.timeout = setTimeout(this.write.bind(this), INTERVAL);
    },

    async write() {

        if (!Object.keys(this._stats).length)
            return this.schedule();

        let stats = this._stats;
        this._stats = {};

        this.schedule();

        for (let action in stats) {
            let res = await instance.mongos.collection('msStats').findAndModify(
                {
                    version: packageInfo.version,
                    action
                },
                [],
                { $inc: stats[action] },
                {
                    upsert: true,
                    new: true
                }
            );

            instance.mongos.collection('msStats').update({
                action: res.value.action,
                version: packageInfo.version
            }, {
                    $set: {
                        avg: Math.ceil(+res.value.ms / +res.value.r)
                    }
                }
            );

        }

    }

};

msStats.write();

log.green('msStatLogger initialized.');
