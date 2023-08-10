<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo; ?></h2>
    <p class="auth__texto">Inicia Sesion en DevWebCamp</p>

    <?php require_once __DIR__ . '/../templates/alertas.php'; ?>

    <form method="POST" action="/login" class="formulario">
        <div class="formulario__campo">
            <label for="email" class="formulario__label">Email</label>
            <input
                type="email"
                class="formulario__input"
                id="email"
                name="email"
                placeholder="Email"
            />
        </div>

        <div class="formulario__campo">
            <label for="password" class="formulario__label">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                class="formulario__input"
                placeholder="Tu password"
            />
        </div>

        <input
            type="submit"
            class="formulario__submit"
            value="Iniciar Sesion"
        />
    </form>
    
    <div class="acciones">
        <a href="/registro" class="acciones__enlace">Aún no tienes una cuenta? Cree una</a>
        <a href="/olvide" class="acciones__enlace">Olvidaste tu password?</a>
    </div>
</main>