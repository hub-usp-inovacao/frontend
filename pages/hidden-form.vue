<template>
  <h1>Secret page</h1>
</template>

<script>
export default {
  middleware({ redirect }) {
    return redirect(
      'https://docs.google.com/forms/d/1jgRwsh8kXhMrGoxlRxKIK-ZcUwuVER62zN2egBRLa9c'
    );
  },
};
</script>
