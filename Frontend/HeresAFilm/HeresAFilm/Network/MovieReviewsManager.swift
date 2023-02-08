//
//  MovieReviewsManager.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import SwiftUI

final class MovieReviewsManager: ObservableObject {
    @Published var reviews = [Review]()
    
    private var movie: Movie
    static var baseURL = "https://api.themoviedb.org/3/movie/"
    
    init(movie: Movie) {
        self.movie = movie
    }
    
    func getMovieReviews() {
        getReviews(for: movie)
    }
    
    private func getReviews(for movie: Movie) {
        let urlString = "\(Self.baseURL)\(movie.id ?? 100)/reviews?api_key=\(TMDB_API.key)"
        NetworkManager<ReviewResponse>.fetch(from: urlString) { (result) in
            switch result {
            case .success(let reviewRespose):
                self.reviews = reviewRespose.results
            case .failure(let err):
                print(err)
            }
            
        }
    }
    
}
