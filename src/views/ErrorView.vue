<template>
  <div class="notfound-container">
    <div class="content w-100 py-5 mx-5">
        <img src="../assets/404.svg" class="w-100 img-fluid h-100">
      <h2 class="my-3">Page not found</h2>
      <p>The page you’re looking for doesn’t exist or was moved.</p>

      <router-link to="/" class="home-btn my-2">
        Go back home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.notfound-container {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  img{
    max-height: 300px;
  }
}

.content h1 {
  font-size: 72px;
  color: #2563eb;
  margin-bottom: 10px;
}

.content h2 {
  font-size: 22px;
  margin-bottom: 10px;
}

.content p {
  color: #666;
  margin-bottom: 20px;
}

.home-btn {
  padding: 10px 16px;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  text-decoration: none;
}
</style>