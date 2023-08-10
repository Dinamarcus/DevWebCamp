<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo; ?></h2>
    <p class="auth__texto">Registrate en DevWebCamp</p>

    <?php 
        require_once __DIR__ . '/../templates/alertas.php';
    ?> 

    <form action="/registro" method="POST" class="formulario">
        <div class="formulario__campo">
            <label id="nombreLabel" for="nombre" class="formulario__label">Nombre</label>
            <input
                type="text"
                class="formulario__input"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value="<?php echo $usuario->nombre; ?>"
            />
        </div>

        <div class="formulario__campo">
            <label id="apellidoLabel" for="apellido" class="formulario__label disabled">Apellido</label>
            <input
                type="text"
                disabled = "true"
                class="formulario__input disabled"
                id="apellido"
                name="apellido"
                placeholder="Tu Apellido"
                value="<?php echo $usuario->apellido; ?>"
            />
        </div>

        <div class="formulario__campo">
            <label id="emailLabel" for="email" class="formulario__label disabled">Email</label>
            <input
                type="email"
                disabled = "true"
                class="formulario__input disabled"
                id="email"
                name="email"
                placeholder="Email"
                value="<?php echo $usuario->email; ?>"
            />
        </div>

        <div class="formulario__campo">
            <label id="passLabel" for="password" class="formulario__label disabled">Password</label>
            <input
                type="password"
                disabled = "true"
                id="password"
                name="password"
                class="formulario__input disabled"
                placeholder="Tu password"
            />
        </div>

        <div class="formulario__campo">
            <label id="confrmPassLabel" for="password2" class="formulario__label disabled">Repetir password</label>
            <input
                type="password"
                disabled = "true"
                id="password2"
                name="password2"
                class="formulario__input disabled"
                placeholder="Repite tu password"
            />
        </div>

        <input
            type="submit"
            class="formulario__submit"
            value="Crear Cuenta"
        />
    </form>

    <div class="acciones">
        <a href="/login" class="acciones__enlace">Ya tienes cuenta? Inicia sesión</a>
        <a href="/olvide" class="acciones__enlace">Olvidaste tu password?</a>
    </div>
</main>

<?php 
    $script = "
    <script src = '/build/js/auth.js'></script>
    ";
?>