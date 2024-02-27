import fs from 'fs';

export const validateRoute = (req, reply, done) => {
    const { lang, slug } = req.params;
    fs.access(`/pages/${lang}/${slug}`, fs.F_OK, (err) => {
        if (err) {
            return reply.redirect(`
                /${lang}/404
            `);
        }
    });
    done();
};
