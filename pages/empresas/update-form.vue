<template>
  <h1>Secret page</h1>
</template>

<script>
export default {
  middleware({ redirect }) {
    return redirect("https://forms.gle/3dK3bTErPx1zR1dE6");
  },
};
</script>
