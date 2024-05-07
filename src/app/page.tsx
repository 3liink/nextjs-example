import AppShellWithoutSidebarLayout from "@/layouts/AppShellWithoutSidebarLayout"
import CarouselComponent from "@/components/CarouselComponent";
import axios from "axios";

const HomePage = async () => {
  // const moviesData = await axios.get("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json").then(response => (response?.data).slice(0, 100))
  const moviesData = await axios.get(process.env.NEXT_PUBLIC_API + "/movies").then(response => response?.data.movies)
  return (
    <AppShellWithoutSidebarLayout>
      {/* <div>
        {moviesData.length}
      </div> */}
      <div>
        <CarouselComponent movies={moviesData} />
      </div>
    </AppShellWithoutSidebarLayout>

  );
}

export default HomePage