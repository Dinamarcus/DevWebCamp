<header class="header">
    <div class="header__contenedor">
        <nav class="header__nav">
            <?php if(is_auth()) { ?>
                <a href="<?php echo is_admin() ? '/admin/dashboard' : '/finalizar-registro'; ?>" class="header__enlace">Administrar</a>
                <form method="POST" action="/logout" class="header__form">
                    <input type="submit" class="header__submit" value="Cerrar Sesion">
                </form>
            <?php }else {?>
                <a href="/registro" class="header__enlace">Registro</a>
                <a href="/login" class="header__enlace">Iniciar Sesion</a>
            <?php } ?>
        </nav>

        <div class="header__contenido">
            <a class="header__effect" href="/">
                <h1 class="border header__logo">&#60;DevWebCamp/></h1>
                <h1 class="wave header__logo">&#60;DevWebCamp/></h1>
            </a>

            <div class="header__contenido--texto">
                <p class="header__texto">Octubre 5-6 - 2023</p>
                <p class="header__texto header__texto--modalidad">En linea - Presencial</p>
                <a href="/registro" class="header__boton">Comprar Pase</a>
            </div>
        </div>
    </div>
</header>
<div class="barra">
    <div class="barra__contenido">
        <a href="/"> 
            <h2 class="barra__logo">
                &#60;DevWebCamp/>
            </h2> 
        </a>
        <nav class="navegacion">
            <a href="/devwebcamp" class="navegacion__enlace <?php echo pagina_actual('/devwebcamp') ? 'navegacion__enlace--actual' : ''; ?>">Evento</a>
            <a href="/paquetes" class="navegacion__enlace <?php echo pagina_actual('/paquetes') ? 'navegacion__enlace--actual' : ''; ?>">Paquetes</a>
            <a href="/workshops-conferencias" class="navegacion__enlace <?php echo pagina_actual('/workshops-conferencias') ? 'navegacion__enlace--actual' : ''; ?>">Workshops / Conferencias</a>
        </nav>
    </div>
</div>