import ArticlePreview from './components/ArticlePreview'
import Header from './layouts/Header'

function App() {
  return (
    <>
      <Header />
      <ArticlePreview 
          id="1234-5678" 
          title="Breaking Tech News" 
          abstractionContent="This is a short preview of the article..." 
          mainImageUrl="https://example.com/image.jpg" 
          createdBy="John Doe" 
      />

    </>
  )
}

export default App
