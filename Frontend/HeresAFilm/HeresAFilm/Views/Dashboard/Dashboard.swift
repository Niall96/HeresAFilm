//
//  Dashboard.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 07/02/2023.
//

import SwiftUI
import Alamofire

struct Dashboard: View {
    var body: some View {
        NavigationView {
            ZStack {
                Color.red.opacity(0.2).ignoresSafeArea()
                VStack{
                    NavigationLink(destination: TrendingMovies().navigationTitle("What's Good")) {
                        Text("Popular Movies")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.black)
                    }
                    NavigationLink(destination: DiscoverMovies().navigationTitle("Discover")) {
                        Text("Discover Movies")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.black)
                    }
                }
            }.navigationTitle("Home")
                .onAppear {
                    let params: [String: String] = [
                        "emailAddress": "emailAddress",
                        "password": "password"]
                    AF.request( "\(API.baseURL)authenticate", method: .post, parameters: params, encoding: JSONEncoding.default)
                        .responseJSON{ (response) in
                            print(response)
                        }
                }
        }.edgesIgnoringSafeArea(.all)
    }
}

struct Dashboard_Previews: PreviewProvider {
    static var previews: some View {
        Dashboard()
    }
}
