//
//  MovieDownloadManager.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import SwiftUI

final class MovieDownloadManager: ObservableObject {
    @Published var movies = [Movie]()
    @Published var cast = [Cast]()
    
    static var baseURL = "https://api.themoviedb.org/3/movie/"
    
    func getNowPlaying() {
        getMovies(movieURL: .nowPlaying)
    }
    
    func getUpcoming() {
        getMovies(movieURL: .upcoming)
    }
    
    func getPopular() {
        getMovies(movieURL: .popular)
    }
    
    func getTopRated() {
        getMovies(movieURL: .topRated)
    }
    
    func getSimilar(movieId: Int) {
        NetworkManager<MovieResponse>.fetch(from: "\(MovieDownloadManager.baseURL)\(movieId)/similar?api_key=\(TMDB_API.key)&language=en-US") { (result) in
            switch result {
            case .success(let movieRespose):
                self.movies = movieRespose.results
            case .failure(let err):
                print(err)
            }
        }
    }
    
    func getCast(for movie: Movie) {
        let urlString = "\(Self.baseURL)\(movie.id ?? 100)/credits?api_key=\(TMDB_API.key)&language=en-US"
        NetworkManager<CastResponse>.fetch(from: urlString) { (result) in
            switch result {
            case .success(let response):
                self.cast = response.cast
            case .failure(let error):
                print(error)
            }
            
        }
    }
    
    private func getMovies(movieURL: MovieURL) {
        NetworkManager<MovieResponse>.fetch(from: movieURL.urlString) { (result) in
            switch result {
            case .success(let movieRespose):
                self.movies = movieRespose.results
            case .failure(let err):
                print(err)
            }
        }
    }
}
