<template>
  <div>
    <app-breadcrumbs />
    <router-view :key="$route.name" />
  </div>
</template>

<script>
export default {
  name: 'AppMedical'
}
</script>
