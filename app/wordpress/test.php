<?php
//Template Name: Test
get_header();

if ( is_user_logged_in() ): ?>
    <main>
        <button type="button" class="btn test-btn">Получить запрос</button>
    </main>
<?php endif; get_footer(); ?>