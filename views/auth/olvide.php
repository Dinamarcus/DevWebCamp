<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo; ?></h2>
    <p class="auth__texto">Recupera tu acceso a DevWebCamp</p>

    <?php
        require_once __DIR__ . '/../templates/alertas.php';
    ?>

    <form method="POST" action="/olvide" class="formulario">
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

        <input
            type="submit"
            class="formulario__submit"
            value="Enviar instrucciones"
        />
    </form>
    
    <div class="acciones">
        <a href="/registro" class="acciones__enlace">Aún no tienes una cuenta? Cree una</a>
        <a href="/login" class="acciones__enlace">Ya tiene una cuenta? Inisia sesión</a>
    </div>
</main>