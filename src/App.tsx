import { useState } from 'react'
import { Heart, Code, Sparkles } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-full p-6 shadow-2xl">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-white mb-4">
              Dobrodošli
            </h1>
            <p className="text-xl text-white/90">
              Moderna web aplikacija sa React, TypeScript i Tailwind CSS
            </p>
          </header>

          {/* Main Content */}
          <main className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Interaktivni Brojač
              </h2>
              <div className="bg-white/20 rounded-2xl p-8 mb-6">
                <p className="text-6xl font-bold text-white mb-4">{count}</p>
                <button
                  onClick={() => setCount(count + 1)}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Klikni me!
                </button>
              </div>
              <button
                onClick={() => setCount(0)}
                className="text-white/80 hover:text-white underline"
              >
                Resetuj brojač
              </button>
            </div>
          </main>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Moderna Tehnologija</h3>
              </div>
              <p className="text-white/80">
                React 18, TypeScript, Vite i Tailwind CSS za brz i moderan razvoj
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Lako za Korišćenje</h3>
              </div>
              <p className="text-white/80">
                Jednostavna struktura projekta spremna za proširenje i razvoj
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center mt-16">
            <p className="text-white/60">
              Započnite razvoj sa <code className="bg-white/20 px-2 py-1 rounded">npm run dev</code>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
