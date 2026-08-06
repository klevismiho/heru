<?php

$wrapper_attributes = get_block_wrapper_attributes();

$show_pagination = $attributes['showPagination'] ?? false;
$posts_per_page  = $attributes['postsPerPage'] ?? 5;

$blog_posts = new WP_Query(
	[
		'post_type'      => 'post',
		'posts_per_page' => $posts_per_page,
		'post_status'    => 'publish',
		'paged'          => get_query_var('paged') ?: 1,
		's'              => get_search_query(),
	]
);

?>

<section <?php echo $wrapper_attributes; ?>>

	<div class="blog-toolbar">

		<div class="blog-categories">

			<ul>

				<li>
					<a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>">
						All
					</a>
				</li>

				<?php
				$categories = get_categories(
					[
						'hide_empty' => true,
					]
				);

				foreach ($categories as $category) :
				?>

					<li>
						<a href="<?php echo esc_url(get_category_link($category->term_id)); ?>">
							<?php echo esc_html($category->name); ?>
						</a>
					</li>

				<?php endforeach; ?>

			</ul>

		</div>


		<div class="blog-search">

			<form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">

				<input
					type="search"
					name="s"
					placeholder="Search articles..."
					value="<?php echo esc_attr(get_search_query()); ?>" />

				<button type="submit" aria-label="Search">

					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path
							d="M21 21L16.65 16.65M19 11A8 8 0 1 1 3 11A8 8 0 0 1 19 11Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round" />
					</svg>

				</button>

			</form>

		</div>

	</div>


	<?php if ($blog_posts->have_posts()) : ?>

		<div class="blog-list">

			<?php while ($blog_posts->have_posts()) : $blog_posts->the_post(); ?>

				<div class="blog-item">

					<div class="item-image">

						<?php if (has_post_thumbnail()) : ?>

							<a href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail(); ?>
							</a>

						<?php endif; ?>

					</div>


					<div class="item-content">

						<h3>
							<a href="<?php the_permalink(); ?>">
								<?php the_title(); ?>
							</a>
						</h3>


						<div class="item-exerpt">
							<?php the_excerpt(); ?>
						</div>


						<div class="wp-block-button is-style-outline">

							<a
								class="wp-block-button__link wp-element-button"
								href="<?php the_permalink(); ?>">
								Read More →
							</a>

						</div>

					</div>

				</div>

			<?php endwhile; ?>

		</div>


		<?php if ($show_pagination) : ?>

			<div class="blog-pagination">

				<?php
				echo paginate_links(
					[
						'total'     => $blog_posts->max_num_pages,
						'current'   => max(1, get_query_var('paged')),
						'prev_text' => '← Previous',
						'next_text' => 'Next →',
					]
				);
				?>

			</div>

		<?php endif; ?>


	<?php endif; ?>


</section>

<?php wp_reset_postdata(); ?>