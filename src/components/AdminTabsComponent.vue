<template>
	<v-app>
		<v-card dark>
			<v-navigation-drawer dark v-model="drawer" permanent>
				<v-divider></v-divider>

				<v-list dense nav>
          <!-- 	v-on:change="$emit('validPassword', $event.target.checked)" -->
					<v-list-item-group
						v-model="listSelection"
						mandatory
						color="green">
						<!-- 	:to="item.path" -->
          <v-list-item @click="$emit('selectedTab', item.action)" v-for="item in items" :key="item.title" link>
							<v-list-item-icon>
								<v-icon>{{ item.icon }}</v-icon>
							</v-list-item-icon>

							<v-list-item-content>
								<v-list-item-title>{{ item.title }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-navigation-drawer>
		</v-card>

		<router-view></router-view>
	</v-app>
</template>

<script>
	export default {
		props: {
			message: String,
			typeAlert: String,
		},

		data() {
			return {
				drawer: true,
				items: [
					{ title: "Beats", icon: "mdi-album", action: "beats" },
					{ title: "Pedidos", icon: "mdi-list-box", action: "pedidos" },
					{
						title: "Usuarios",
						icon: "mdi-account-group-outline",
						action: "usuarios",
					},
				],
				listSelection: 0, //default item selected
				listItemSelected: null,
			};
		},

		methods: {
			menuActionClick(action) {
				if (action === "beats") {
					alert("beats!!");
				} else if (action === "pedidos") {
					alert("pedidos!!");
				} else if (action === "usuarios") {
					alert("usuarios!!");
				}
			},
		},
	};
</script>

<style></style>
