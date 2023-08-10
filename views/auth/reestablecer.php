<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo; ?></h2>
    <p class="auth__texto">Coloca tu nuevo password</p>

    <?php
        require_once __DIR__ . '/../templates/alertas.php';
    ?>

    <?php if ($token_valido) { ?>
        <form method="POST" class="formulario">
            <div class="formulario__campo">
                <label for="password" class="formulario__label">Nuevo Password</label>
                <input
                    type="password"
                    class="formulario__input"
                    id="password"
                    name="password"
                    placeholder="Escribe tu nuevo password"
                />
            </div>

            <input
                type="submit"
                class="formulario__submit"
                value="Guardar Password"
            />
        </form>
    <?php } ?>

    <div class="acciones">
        <a href="/registro" class="acciones__enlace">Aún no tienes una cuenta? Cree una</a>
        <a href="/login" class="acciones__enlace">Ya tiene una cuenta? Inisia sesión</a>
    </div>
</main>