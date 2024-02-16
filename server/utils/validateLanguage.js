export const validateLanguage = (request, reply, done) => {
    const urlParts = request.raw.url.split('/');
    const lang = urlParts[1];
    const supportedLangs = ['es'];

    if (!supportedLangs.includes(lang)) {
        return reply.redirect(`/es${request.raw.url}`);
    }
    done();
};
