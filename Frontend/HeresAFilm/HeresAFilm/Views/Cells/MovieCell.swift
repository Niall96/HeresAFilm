//
//  MovieCell.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import SwiftUI

struct MovieCell: View {
    var movie: Movie
    var body: some View {
        HStack(alignment: .top, spacing: 20) {

            moviePoster
            VStack(alignment: .leading, spacing: 0) {
                movieTitle
                
                HStack {
                    movieRating
                    movieReleaseDate
                }
                
                movieOverview
            }
        }
    }
    
    private var moviePoster: some View {
        AsyncImage(url: URL(string: movie.posterPath)!){
            Rectangle().foregroundColor(.gray.opacity(0.5))
        } image: { (img) -> Image in
            Image(uiImage: img)
                .resizable()
        }
            .frame(width: 100, height: 160)
            .animation(.easeInOut)
            .transition(.opacity)
            .scaledToFill()
            .cornerRadius(15)
            .shadow(radius: 15)
    }
    
    private var movieTitle: some View {
        Text(movie.titleWithLang)
            .font(.system(size: 15))
            .bold()
            .foregroundColor(.blue)
    }
    
    private var movieRating: some View {
        ZStack {
            Circle()
                .trim(from: 0, to: CGFloat(movie.voteAverage))
                .stroke(getColor(value: movie.vote_average ?? 0.0), lineWidth: 4)
                .frame(width: 50)
                .rotationEffect(.degrees(-90))
            Circle()
                .trim(from: 0, to: 1)
                .stroke(getColor(value: movie.vote_average ?? 0.0).opacity(0.2), lineWidth: 4)
                .frame(width: 50)
                .rotationEffect(.degrees(-90))
            Text(String.init(format: "%.1f", movie.vote_average ?? 0.0))
                .foregroundColor(getColor(value: movie.vote_average ?? 0.0))
                .font(.subheadline)
        }.frame(height: 80)
    }
    
    private var movieReleaseDate: some View {
        Text(movie.release_date ?? "")
            .foregroundColor(.black)
            .font(.subheadline)
    }
    
    private var movieOverview: some View {
        Text(movie.overview ?? "")
            .font(.body)
            .foregroundColor(Color.gray)
    }
    
    func getColor(value: Double) -> Color {
        if value < 4.0 {
            return .red
        } else if value >= 4.0 && value < 6 {
            return .orange
        } else if value >= 6.0 && value < 8 {
            return .yellow
        } else {
            return .green
        }
    }
}

