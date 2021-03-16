class PagesApi {
    constructor(api) {
        this.api = api;
    }

    find(id) {
        return this.api.requestGet(
            this.api.route('pages.show', {
                page: id,
            }),
            null,
            {
                withSession: true,
            },
        );
    }

    findBySlug(slug) {
        return this.api.requestGet(
            this.api.route('page', {
                page_slug: slug,
            }),
            null,
            {
                withSession: true,
            },
        );
    }

    findByUrl(url) {
        return this.api.requestGet(url.match(/\.json$/) === null ? `${url}.json` : url, null, {
            withSession: true,
        });
    }

    get(query = {}, page = 1, count = 10) {
        const finalQuery = {
            ...query,
        };
        if (page !== null) {
            finalQuery.page = page;
        }
        if (count !== null) {
            finalQuery.count = count;
        }
        return this.api.requestGet(this.api.route('pages.index'), finalQuery, {
            withSession: true,
        });
    }

    create(data) {
        return this.api.requestPost(this.api.route('pages.store'), data, {
            withSession: true,
        });
    }

    update(id, data) {
        return this.api.requestPatch(
            this.api.route('pages.update', {
                page: id,
            }),
            data,
            {
                withSession: true,
            },
        );
    }

    delete(id) {
        return this.api.requestDelete(
            this.api.route('pages.destroy', {
                page: id,
            }),
            null,
            {
                withSession: true,
            },
        );
    }
}

export default PagesApi;
