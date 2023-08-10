<main class="devwebcamp">
    <h2 class="devwebcamp__heading"><?php echo $titulo; ?></h2>

    <p class="devwebcamp__descripcion">
        Conoce la conferencia mas importante de Latinoamerica
    </p>

    <div class="devwebcamp__grid">
        <div <?php echo aos_animacion(); ?> class="devwebcamp__imagen">
            <picture>
                <source srcset="build/img/sobre_devwebcamp.avif" type="image/avif">
                <source srcset="build/img/sobre_devwebcamp.webp" type="image/webp">

                <img loading="lazy" width="200" height="300" src="build/img/sobre_devwebcamp.jpg" alt="imagen DevWebCamp">
            </picture>
        </div>

        <div <?php echo aos_animacion(); ?> class="devwebcamp__contenido">
            <p class="devwebcamp__texto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nisi ex, porttitor et pharetra nec, bibendum non turpis. Aenean a consectetur diam. Duis nec vehicula magna. Sed vel nisi eu lacus eleifend laoreet. Cras pretium justo nec erat efficitur, id faucibus urna aliquet. Fusce mattis pretium ante, nec lacinia odio congue vitae. Donec ut lacinia purus. Etiam sit amet odio metus. Curabitur mauris leo, convallis non sem eu, mollis tincidunt turpis.
            </p>

            <p class="devwebcamp__contenido">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nisi ex, porttitor et pharetra nec, bibendum non turpis. Aenean a consectetur diam. Duis nec vehicula magna. 
            </p>
        </div>
    </div>
</main>