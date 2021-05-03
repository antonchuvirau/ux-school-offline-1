(function () {

    let defaultIndex = 0;

    const maps = [
        // 'https://yandex.by/map-widget/v1/-/CCQ3FSqPXD',
        'https://yandex.by/map-widget/v1/-/CCU4MXgLtD',
        'https://yandex.by/map-widget/v1/-/CCQ3FSBghC',
        'https://yandex.by/map-widget/v1/-/CCQpQFGY9B',
        '',
        'https://yandex.by/map-widget/v1/-/CCQ3FSFCTD'
    ];

    function initMapIframe(showModal=false) {
        document.querySelector('.map').querySelector('iframe').setAttribute('src', maps[defaultIndex]);
        if (showModal) {
            jQuery('#map').modal();
        }
        return;
    }

    document.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.office-route-button')) {
            defaultIndex = +target.dataset.mapIndex;
            initMapIframe(true);
        }
        if (target.matches('.contact-page__info-item')) {
            defaultIndex = +target.dataset.mapIndex;
            initMapIframe();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        if (document.body.classList.contains('page-id-62')) {
            initMapIframe();
        }
    });
})();