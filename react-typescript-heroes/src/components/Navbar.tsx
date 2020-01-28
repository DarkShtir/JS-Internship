import React from 'react';

export const Navbar: React.FC = () => {
	return (
		<>
			<nav>
				<div className="nav-wrapper deep-purple darken-3">
					<a href="/" className="brand-logo center">
						React+TypeScript
					</a>

					<ul className="right">
						<li>
							<a href="/">Список дел</a>
						</li>
						<li>
							<a href="/">Информация</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};
